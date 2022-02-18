import { element, by, ElementFinder } from 'protractor';

export class ProduttoreComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-produttore div table .btn-danger'));
  title = element.all(by.css('jhi-produttore div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ProduttoreUpdatePage {
  pageTitle = element(by.id('jhi-produttore-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idProduttoreInput = element(by.id('field_idProduttore'));
  dsProduttoreInput = element(by.id('field_dsProduttore'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdProduttoreInput(idProduttore: string): Promise<void> {
    await this.idProduttoreInput.sendKeys(idProduttore);
  }

  async getIdProduttoreInput(): Promise<string> {
    return await this.idProduttoreInput.getAttribute('value');
  }

  async setDsProduttoreInput(dsProduttore: string): Promise<void> {
    await this.dsProduttoreInput.sendKeys(dsProduttore);
  }

  async getDsProduttoreInput(): Promise<string> {
    return await this.dsProduttoreInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ProduttoreDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-produttore-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-produttore'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
