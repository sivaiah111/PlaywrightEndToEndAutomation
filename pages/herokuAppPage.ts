import {Locator,Page } from '@playwright/test';
import { BasePage } from './basePage';
import path from 'path';

export class HerokuAppPage extends BasePage {  
    private javascriptAlertsLink: Locator;
   
    constructor(page:Page) {
        super(page);
        this.javascriptAlertsLink = page.getByRole('link', { name: 'JavaScript Alerts' });
    }

    async navigateToJavaScriptAlerts() {
        await this.javascriptAlertsLink.click();
    }

    async clickSimpleAlertButton() {
        await this.page.click('button[onclick="jsAlert()"]');
    }

    async clickConfirmAlertButton() {
        await this.page.click('button[onclick="jsConfirm()"]');
    }

    async clickPromptAlertButton() {
        await this.page.click('button[onclick="jsPrompt()"]');
    }

    async getResultText() {
        return this.page.locator('#result').textContent();
    }
}