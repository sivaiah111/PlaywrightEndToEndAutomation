import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import path from 'path';

export class HerokuAppPage extends BasePage {
    private javascriptAlertsLink: Locator;

    constructor(page: Page) {
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
    //handle frames
    async navigateToFrames() {
        await this.page.getByRole('link', { name: 'Frames', exact: true }).click();
    }

    async navigateToNestedFrames() {
        await this.page.getByRole('link', { name: 'Nested Frames', exact: true }).click();
    }

    async getMiddleFrameText(): Promise<string | null> {
        const middleFrame = this.page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]');
        return await middleFrame.locator('#content').textContent();
    }

    async navigateToiFrames() {
        await this.page.getByRole('link', { name: 'iFrame', exact: true }).click();
    }

    async getTextInIFrame(): Promise<string | null> {
        const iframe = this.page.frameLocator('#mce_0_ifr');
        await this.page.waitForSelector('#mce_0_ifr'); // Wait for the iframe to be available..
        //click on the close icon
        const closeButton = this.page.locator('button[class*="tox-notification__dismiss"]');
        if (await closeButton.isVisible()) {
            await closeButton.click();
        }
        const txt = await iframe.locator('#tinymce').textContent();
        return txt ? txt.trim() : null;// Ensure the text area is loaded before typing.
    }


    async getTextFromIFrame() {
        const iframe = this.page.frameLocator('#mce_0_ifr');
        return iframe.locator('#tinymce').textContent();
    }
    //handling file upload
    async navigateToFileUpload() {
        await this.page.getByRole('link', { name: 'File Upload' }).click();                        
    }

    //single file upload
    async uploadFile(fileName: string) {
        const filePath = path.resolve(`testdata/${fileName}`);
        const fileInput = this.page.locator('#file-upload');
        await fileInput.setInputFiles(filePath);
        await this.page.getByRole('button', { name: 'Upload' }).click();
    }

    //multipl file upload
    async uploadMultipleFiles(fileNames: string[]) {
        const filePaths = fileNames.map(fileName => path.resolve(`testdata/${fileName}`));
        const fileInput = this.page.locator('#file-upload');
        await fileInput.setInputFiles(filePaths);
        await this.page.getByRole('button', { name: 'Upload' }).click();
    } 

    async getUploadedFileName() {
        return (await this.page.locator('#uploaded-files').innerText()).trim();
    }

        //handling multipl windows
        async navigateToMultipleWindows() {
        await this.page.getByRole('link', { name: 'Multiple Windows' }).click();                        
    }

    async clickClickHereLink() {
        await this.page.getByRole('link', { name: 'Click Here' }).click();                        
    }

}