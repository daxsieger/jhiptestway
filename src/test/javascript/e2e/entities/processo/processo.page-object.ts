import { element, by, ElementFinder } from 'protractor';

export class ProcessoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-processo div table .btn-danger'));
  title = element.all(by.css('jhi-processo div h2#page-heading span')).first();
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

export class ProcessoUpdatePage {
  pageTitle = element(by.id('jhi-processo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idProcessoInput = element(by.id('field_idProcesso'));
  dsProcessoInput = element(by.id('field_dsProcesso'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdProcessoInput(idProcesso: string): Promise<void> {
    await this.idProcessoInput.sendKeys(idProcesso);
  }

  async getIdProcessoInput(): Promise<string> {
    return await this.idProcessoInput.getAttribute('value');
  }

  async setDsProcessoInput(dsProcesso: string): Promise<void> {
    await this.dsProcessoInput.sendKeys(dsProcesso);
  }

  async getDsProcessoInput(): Promise<string> {
    return await this.dsProcessoInput.getAttribute('value');
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

export class ProcessoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-processo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-processo'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
