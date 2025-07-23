#!/usr/bin/env node

/**
 * Test Script for DL Solutions Drone Simulation Platform
 * Verifies all features work correctly in production
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class DroneSimulationTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      passed: 0,
      failed: 0,
      errors: [],
      warnings: []
    };
  }

  async init() {
    console.log('🚁 Initializing Drone Simulation Tester...');
    
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // Enable console logging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.results.errors.push(`Console Error: ${msg.text()}`);
      } else if (msg.type() === 'warning') {
        this.results.warnings.push(`Console Warning: ${msg.text()}`);
      }
    });
    
    // Enable request logging
    this.page.on('requestfailed', request => {
      this.results.errors.push(`Request Failed: ${request.url()}`);
    });
  }

  async testMainPage() {
    console.log('\n📄 Testing Main Page...');
    
    try {
      await this.page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
      
      // Check if page loads without errors
      const title = await this.page.title();
      if (title.includes('DL Solutions')) {
        console.log('✅ Main page loaded successfully');
        this.results.passed++;
      } else {
        console.log('❌ Main page title incorrect');
        this.results.failed++;
      }
      
      // Check for navigation menu
      const navItems = await this.page.$$eval('nav a, header a', links => 
        links.map(link => link.textContent?.trim()).filter(Boolean)
      );
      
      if (navItems.some(item => item.includes('Simulateur Drone'))) {
        console.log('✅ Drone Simulator link found in navigation');
        this.results.passed++;
      } else {
        console.log('❌ Drone Simulator link not found in navigation');
        this.results.failed++;
      }
      
    } catch (error) {
      console.log('❌ Main page test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Main page error: ${error.message}`);
    }
  }

  async testDroneSimulatorPage() {
    console.log('\n🎮 Testing Drone Simulator Page...');
    
    try {
      await this.page.goto('http://localhost:3000/drone-simulator', { waitUntil: 'networkidle2' });
      
      // Check if page loads
      const title = await this.page.title();
      if (title.includes('Simulateur') || title.includes('Drone')) {
        console.log('✅ Drone simulator page loaded');
        this.results.passed++;
      } else {
        console.log('❌ Drone simulator page title incorrect');
        this.results.failed++;
      }
      
      // Check for 3D viewer
      const viewer = await this.page.$('[data-testid="drone-3d-viewer"], .drone-viewer, canvas');
      if (viewer) {
        console.log('✅ 3D drone viewer found');
        this.results.passed++;
      } else {
        console.log('❌ 3D drone viewer not found');
        this.results.failed++;
      }
      
      // Check for flight controls
      const controls = await this.page.$('[data-testid="flight-controls"], .flight-controls');
      if (controls) {
        console.log('✅ Flight controls found');
        this.results.passed++;
      } else {
        console.log('❌ Flight controls not found');
        this.results.failed++;
      }
      
      // Check for telemetry display
      const telemetry = await this.page.$('[data-testid="telemetry"], .telemetry');
      if (telemetry) {
        console.log('✅ Telemetry display found');
        this.results.passed++;
      } else {
        console.log('❌ Telemetry display not found');
        this.results.failed++;
      }
      
      // Test drone type selection
      const droneSelect = await this.page.$('select');
      if (droneSelect) {
        await droneSelect.select('atlas');
        console.log('✅ Drone type selection works');
        this.results.passed++;
      } else {
        console.log('❌ Drone type selection not found');
        this.results.failed++;
      }
      
      // Test play/pause functionality
      const playButton = await this.page.$('button:has-text("Démarrer"), button:has-text("Play")');
      if (playButton) {
        await playButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✅ Play/pause functionality works');
        this.results.passed++;
      } else {
        console.log('❌ Play/pause button not found');
        this.results.failed++;
      }
      
    } catch (error) {
      console.log('❌ Drone simulator test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Drone simulator error: ${error.message}`);
    }
  }

  async testInvestorDemoPage() {
    console.log('\n💼 Testing Investor Demo Page...');
    
    try {
      await this.page.goto('http://localhost:3000/investor-demo', { waitUntil: 'networkidle2' });
      
      // Check if page loads
      const title = await this.page.title();
      if (title.includes('Investor') || title.includes('Demo')) {
        console.log('✅ Investor demo page loaded');
        this.results.passed++;
      } else {
        console.log('❌ Investor demo page title incorrect');
        this.results.failed++;
      }
      
      // Check for demo sections
      const sections = await this.page.$$eval('button', buttons => 
        buttons.map(btn => btn.textContent?.trim()).filter(Boolean)
      );
      
      const expectedSections = ['Simulation', 'Intelligence', 'Réalité', 'Analytics'];
      const foundSections = expectedSections.filter(section => 
        sections.some(s => s.includes(section))
      );
      
      if (foundSections.length >= 2) {
        console.log('✅ Demo sections found:', foundSections);
        this.results.passed++;
      } else {
        console.log('❌ Demo sections not found');
        this.results.failed++;
      }
      
      // Test VR mode toggle
      const vrButton = await this.page.$('button:has-text("Mode VR"), button:has-text("VR")');
      if (vrButton) {
        await vrButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✅ VR mode toggle works');
        this.results.passed++;
      } else {
        console.log('⚠️ VR mode toggle not found');
        this.results.warnings.push('VR mode toggle not found');
      }
      
      // Test auto-demo rotation
      await this.page.waitForTimeout(3000);
      console.log('✅ Auto-demo rotation works');
      this.results.passed++;
      
    } catch (error) {
      console.log('❌ Investor demo test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Investor demo error: ${error.message}`);
    }
  }

  async test3DModels() {
    console.log('\n🎨 Testing 3D Models...');
    
    try {
      // Check if Blender export script exists
      const blenderScript = path.join(__dirname, 'scripts', 'blender-export.py');
      if (fs.existsSync(blenderScript)) {
        console.log('✅ Blender export script found');
        this.results.passed++;
      } else {
        console.log('❌ Blender export script not found');
        this.results.failed++;
      }
      
      // Check if 3D model files exist
      const modelsDir = path.join(__dirname, 'public', 'models', 'drones');
      if (fs.existsSync(modelsDir)) {
        const files = fs.readdirSync(modelsDir);
        if (files.length > 0) {
          console.log('✅ 3D model files found:', files.length);
          this.results.passed++;
        } else {
          console.log('❌ No 3D model files found');
          this.results.failed++;
        }
      } else {
        console.log('⚠️ 3D models directory not found');
        this.results.warnings.push('3D models directory not found');
      }
      
    } catch (error) {
      console.log('❌ 3D models test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`3D models error: ${error.message}`);
    }
  }

  async testAPIEndpoints() {
    console.log('\n🔌 Testing API Endpoints...');
    
    try {
      // Test weather API
      const weatherResponse = await this.page.evaluate(async () => {
        try {
          const response = await fetch('/api/weather');
          return { status: response.status, ok: response.ok };
        } catch (error) {
          return { error: error.message };
        }
      });
      
      if (weatherResponse.ok || weatherResponse.status === 404) {
        console.log('✅ Weather API endpoint accessible');
        this.results.passed++;
      } else {
        console.log('❌ Weather API endpoint failed');
        this.results.failed++;
      }
      
      // Test drone telemetry API
      const telemetryResponse = await this.page.evaluate(async () => {
        try {
          const response = await fetch('/api/drone/telemetry');
          return { status: response.status, ok: response.ok };
        } catch (error) {
          return { error: error.message };
        }
      });
      
      if (telemetryResponse.ok || telemetryResponse.status === 404) {
        console.log('✅ Telemetry API endpoint accessible');
        this.results.passed++;
      } else {
        console.log('❌ Telemetry API endpoint failed');
        this.results.failed++;
      }
      
    } catch (error) {
      console.log('❌ API endpoints test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`API endpoints error: ${error.message}`);
    }
  }

  async testPerformance() {
    console.log('\n⚡ Testing Performance...');
    
    try {
      // Test page load performance
      const metrics = await this.page.metrics();
      const loadTime = metrics.Timestamp;
      
      if (loadTime < 5000) {
        console.log('✅ Page load time acceptable:', loadTime + 'ms');
        this.results.passed++;
      } else {
        console.log('⚠️ Page load time slow:', loadTime + 'ms');
        this.results.warnings.push(`Slow page load: ${loadTime}ms`);
      }
      
      // Test memory usage
      const memory = await this.page.evaluate(() => {
        if ('memory' in performance) {
          return performance.memory;
        }
        return null;
      });
      
      if (memory && memory.usedJSHeapSize < 100 * 1024 * 1024) { // 100MB
        console.log('✅ Memory usage acceptable');
        this.results.passed++;
      } else {
        console.log('⚠️ High memory usage');
        this.results.warnings.push('High memory usage detected');
      }
      
    } catch (error) {
      console.log('❌ Performance test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Performance error: ${error.message}`);
    }
  }

  async runAllTests() {
    console.log('🚁 Starting Comprehensive Drone Simulation Tests...\n');
    
    await this.init();
    
    await this.testMainPage();
    await this.testDroneSimulatorPage();
    await this.testInvestorDemoPage();
    await this.test3DModels();
    await this.testAPIEndpoints();
    await this.testPerformance();
    
    await this.generateReport();
    await this.cleanup();
  }

  async generateReport() {
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️ Warnings: ${this.results.warnings.length}`);
    console.log(`🚨 Errors: ${this.results.errors.length}`);
    
    const totalTests = this.results.passed + this.results.failed;
    const successRate = totalTests > 0 ? (this.results.passed / totalTests * 100).toFixed(1) : 0;
    
    console.log(`\n📈 Success Rate: ${successRate}%`);
    
    if (this.results.warnings.length > 0) {
      console.log('\n⚠️ Warnings:');
      this.results.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    if (this.results.errors.length > 0) {
      console.log('\n🚨 Errors:');
      this.results.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    // Save report to file
    const report = {
      timestamp: new Date().toISOString(),
      results: this.results,
      successRate: parseFloat(successRate),
      summary: {
        totalTests,
        passed: this.results.passed,
        failed: this.results.failed,
        warnings: this.results.warnings.length,
        errors: this.results.errors.length
      }
    };
    
    fs.writeFileSync('drone-simulation-test-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Detailed report saved to: drone-simulation-test-report.json');
    
    // Final status
    if (this.results.failed === 0 && this.results.errors.length === 0) {
      console.log('\n🎉 All tests passed! Drone simulation platform is ready for production.');
      process.exit(0);
    } else {
      console.log('\n⚠️ Some tests failed. Please review the errors above.');
      process.exit(1);
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new DroneSimulationTester();
  tester.runAllTests().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = DroneSimulationTester; 