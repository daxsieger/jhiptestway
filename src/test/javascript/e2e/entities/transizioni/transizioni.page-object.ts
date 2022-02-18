import { element, by, ElementFinder } from 'protractor';

export class TransizioniComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-transizioni div table .btn-danger'));
  title = element.all(by.css('jhi-transizioni div h2#page-heading span')).first();
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

export class TransizioniUpdatePage {
  pageTitle = element(by.id('jhi-transizioni-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  idTransizioneInput = element(by.id('field_idTransizione'));
  dsTransizioneInput = element(by.id('field_dsTransizione'));

  processoSelect = element(by.id('field_processo'));
  stadioInizialeSelect = element(by.id('field_stadioIniziale'));
  stadioFinaleSelect = element(by.id('field_stadioFinale'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setIdTransizioneInput(idTransizione: string): Promise<void> {
    await this.idTransizioneInput.sendKeys(idTransizione);
  }

  async getIdTransizioneInput(): Promise<string> {
    return await this.idTransizioneInput.getAttribute('value');
  }

  async setDsTransizioneInput(dsTransizione: string): Promise<void> {
    await this.dsTransizioneInput.sendKeys(dsTransizione);
  }

  async getDsTransizioneInput(): Promise<string> {
    return await this.dsTransizioneInput.getAttribute('value');
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

  async stadioInizialeSelectLastOption(): Promise<void> {
    await this.stadioInizialeSelect.all(by.tagName('option')).last().click();
  }

  async stadioInizialeSelectOption(option: string): Promise<void> {
    await this.stadioInizialeSelect.sendKeys(option);
  }

  getStadioInizialeSelect(): ElementFinder {
    return this.stadioInizialeSelect;
  }

  async getStadioInizialeSelectedOption(): Promise<string> {
    return await this.stadioInizialeSelect.element(by.css('option:checked')).getText();
  }

  async stadioFinaleSelectLastOption(): Promise<void> {
    await this.stadioFinaleSelect.all(by.tagName('option')).last().click();
  }

  async stadioFinaleSelectOption(option: string): Promise<void> {
    await this.stadioFinaleSelect.sendKeys(option);
  }

  getStadioFinaleSelect(): ElementFinder {
    return this.stadioFinaleSelect;
  }

  async getStadioFinaleSelectedOption(): Promise<string> {
    return await this.stadioFinaleSelect.element(by.css('option:checked')).getText();
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

export class TransizioniDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-transizioni-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-transizioni'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
