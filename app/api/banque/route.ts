import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Statistiques du dashboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'stats':
        return await getStats();
      case 'accounts':
        return await getAccounts();
      case 'clients':
        return await getClients();
      case 'transactions':
        return await getTransactions();
      case 'credits':
        return await getCredits();
      default:
        return NextResponse.json({ error: 'Type non reconnu' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur API banque:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

async function getStats() {
  const [
    { count: totalAccounts },
    { count: totalClients },
    { count: totalTransactions },
    { data: balanceData }
  ] = await Promise.all([
    supabase.from('bank_accounts').select('*', { count: 'exact', head: true }),
    supabase.from('bank_clients').select('*', { count: 'exact', head: true }),
    supabase.from('bank_transactions').select('*', { count: 'exact', head: true }),
    supabase.from('bank_accounts').select('balance')
  ]);

  const totalAmount = balanceData?.reduce((sum, account) => sum + (account.balance || 0), 0) || 0;

  return NextResponse.json({
    totalAccounts: totalAccounts || 0,
    totalClients: totalClients || 0,
    totalTransactions: totalTransactions || 0,
    totalAmount
  });
}

async function getAccounts() {
  const { data, error } = await supabase
    .from('bank_accounts')
    .select(`
      *,
      bank_clients(firstName, lastName)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const accounts = data?.map(account => ({
    id: account.id,
    accountNumber: account.account_number,
    accountType: account.account_type,
    balance: account.balance,
    clientName: `${account.bank_clients?.firstName} ${account.bank_clients?.lastName}`,
    status: account.status,
    createdAt: account.created_at
  })) || [];

  return NextResponse.json({ accounts });
}

async function getClients() {
  const { data, error } = await supabase
    .from('bank_clients')
    .select(`
      *,
      bank_accounts(id, balance)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const clients = data?.map(client => ({
    id: client.id,
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email,
    phone: client.phone,
    accountCount: client.bank_accounts?.length || 0,
    totalBalance: client.bank_accounts?.reduce((sum, account) => sum + (account.balance || 0), 0) || 0,
    status: client.status,
    createdAt: client.created_at
  })) || [];

  return NextResponse.json({ clients });
}

async function getTransactions() {
  const { data, error } = await supabase
    .from('bank_transactions')
    .select(`
      *,
      bank_accounts(account_number),
      bank_clients(firstName, lastName)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const transactions = data?.map(transaction => ({
    id: transaction.id,
    type: transaction.type,
    amount: transaction.amount,
    accountNumber: transaction.bank_accounts?.account_number,
    clientName: `${transaction.bank_clients?.firstName} ${transaction.bank_clients?.lastName}`,
    description: transaction.description,
    date: transaction.created_at,
    status: transaction.status
  })) || [];

  return NextResponse.json({ transactions });
}

async function getCredits() {
  const { data, error } = await supabase
    .from('bank_credits')
    .select(`
      *,
      bank_clients(firstName, lastName)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const credits = data?.map(credit => ({
    id: credit.id,
    clientName: `${credit.bank_clients?.firstName} ${credit.bank_clients?.lastName}`,
    amount: credit.amount,
    remainingAmount: credit.remaining_amount,
    monthlyPayment: credit.monthly_payment,
    interestRate: credit.interest_rate,
    startDate: credit.start_date,
    endDate: credit.end_date,
    status: credit.status,
    nextPaymentDate: credit.next_payment_date
  })) || [];

  return NextResponse.json({ credits });
} 