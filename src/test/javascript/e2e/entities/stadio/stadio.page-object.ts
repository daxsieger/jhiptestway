import { element, by, ElementFinder } from 'protractor';

export class StadioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-stadio div table .btn-danger'));
  title = element.all(by.css('jhi-stadio div h2#page-heading span')).first();
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

export class StadioUpdatePage {
  pageTitle = element(by.id('jhi-stadio-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idStadioInput = element(by.id('field_idStadio'));
  dsStadioInput = element(by.id('field_dsStadio'));

  processoSelect = element(by.id('field_processo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdStadioInput(idStadio: string): Promise<void> {
    await this.idStadioInput.sendKeys(idStadio);
  }

  async getIdStadioInput(): Promise<string> {
    return await this.idStadioInput.getAttribute('value');
  }

  async setDsStadioInput(dsStadio: string): Promise<void> {
    await this.dsStadioInput.sendKeys(dsStadio);
  }

  async getDsStadioInput(): Promise<string> {
    return await this.dsStadioInput.getAttribute('value');
  }

  async processoSelectLastOption(): Promise<void> {
    await this.processoSelect.all(by.tagName('option')).last().click();
  }

  async processoSelectOption(option: string): Promise<void> {
    await this.processoSelect.sendKeys(option);
  }

  getProcessoSelect(): ElementFinder {
    return this.processoSelect;
  }

  async getProcessoSelectedOption(): Promise<string> {
    return await this.processoSelect.element(by.css('option:checked')).getText();
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

export class StadioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-stadio-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-stadio'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
