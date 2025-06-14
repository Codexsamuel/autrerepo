"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface AccountInfo {
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
}

interface Position {
  symbol: string;
  type: 'BUY' | 'SELL';
  volume: number;
  openPrice: number;
  currentPrice: number;
  profit: number;
}

export default function DAVYDashboard() {
  const [symbol, setSymbol] = useState('EURUSD');
  const [volume, setVolume] = useState('0.01');
  const [stopLoss, setStopLoss] = useState('0.1');
  const [takeProfit, setTakeProfit] = useState('0.1');
  const [loading, setLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const executeMetaTrader = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/trading/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          volume: parseFloat(volume),
          stopLoss: parseFloat(stopLoss),
          takeProfit: parseFloat(takeProfit)
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Trade executed successfully');
        fetchPositions();
      } else {
        toast.error(data.error || 'Failed to execute trade');
      }
    } catch (error) {
      toast.error('Error executing trade');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const triggerPRT = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/trading/signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signalId: 'BUY_SIGNAL_001',
          symbol,
          direction: 'BUY',
          volume: parseFloat(volume)
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Signal sent successfully');
      } else {
        toast.error(data.error || 'Failed to send signal');
      }
    } catch (error) {
      toast.error('Error sending signal');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountInfo = async () => {
    try {
      const response = await fetch('/api/trading/account');
      const data = await response.json();
      setAccountInfo(data);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await fetch('/api/trading/positions');
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  useEffect(() => {
    if (isClient) {
      fetchAccountInfo();
      fetchPositions();
      const interval = setInterval(() => {
        fetchAccountInfo();
        fetchPositions();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">🎯 DAVY Trading Center</h2>
      
      <Tabs defaultValue="trading" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="trading">
          <Card>
            <CardHeader>
              <CardTitle>Execute Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Symbol</label>
                  <Input
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Ex: EURUSD"
                  />
                </div>
                <div className="space-y-2">
                  <label>Volume</label>
                  <Input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <label>Stop Loss</label>
                  <Input
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <label>Take Profit</label>
                  <Input
                    type="number"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    step="0.01"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={executeMetaTrader}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Execute Trade
                    </>
                  )}
                </Button>
                <Button
                  onClick={triggerPRT}
                  disabled={loading}
                  variant="outline"
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Activity className="mr-2 h-4 w-4" />
                      Send PRT Signal
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions">
          <Card>
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{position.symbol}</div>
                      <div className="text-sm text-gray-500">
                        {position.type} {position.volume} lots
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {position.profit > 0 ? (
                          <span className="text-green-500">+${position.profit.toFixed(2)}</span>
                        ) : (
                          <span className="text-red-500">-${Math.abs(position.profit).toFixed(2)}</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Open: {position.openPrice} | Current: {position.currentPrice}
                      </div>
                    </div>
                  </div>
                ))}
                {positions.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    No open positions
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              {accountInfo ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500">Balance</div>
                    <div className="text-xl font-medium">${accountInfo.balance.toFixed(2)}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500">Equity</div>
                    <div className="text-xl font-medium">${accountInfo.equity.toFixed(2)}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500">Margin</div>
                    <div className="text-xl font-medium">${accountInfo.margin.toFixed(2)}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500">Free Margin</div>
                    <div className="text-xl font-medium">${accountInfo.freeMargin.toFixed(2)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  Loading account information...
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 