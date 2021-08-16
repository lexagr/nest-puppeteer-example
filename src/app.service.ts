import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Puppeteer from 'puppeteer-core';

@Injectable()
export class AppService {
  private puppeteerInstance: Puppeteer.Browser = null;

  constructor(private readonly configService: ConfigService) {}

  private async GetInstance(): Promise<Puppeteer.Browser> {
    if (!this.puppeteerInstance || !this.puppeteerInstance.isConnected()) {
      // enable user-data-dir arg for docker
      this.puppeteerInstance = await Puppeteer.launch({
        executablePath: this.configService.get('BROWSER_EXECUTABLE'),
        args: [
          '--headless',
          '--disable-gpu',
          '--user-data-dir=~/chromium_user_data',
          `--remote-debugging-port=${this.configService.get('DEVTOOLS_PORT')}`,
        ],
      });
    }

    return this.puppeteerInstance;
  }

  // return filepath
  async getScreenshotForTarget(target: string): Promise<string> {
    const puppeteer = await this.GetInstance();
    const page = await puppeteer.newPage();

    await page.goto(target, {
      waitUntil: 'networkidle2',
    });

    const filepath = `${process.cwd()}/storage/${Date.now()}.png`;
    await page.screenshot({
      type: 'png',
      path: filepath,
      fullPage: true,
    });

    await page.close();

    return filepath;
  }
}
