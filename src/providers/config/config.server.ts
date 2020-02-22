import { Injectable } from '@angular/core';

import { environment } from '../../app/environments/environment';

export let apiUrl = environment.apiUrl;
export let buildVersion = environment.buildVesion;


@Injectable()
export class ConfigService {

 /**
   * Api Url
   * 
   * @private
   */
  private _apiUrl = apiUrl;
  
  /**
   * App build version
   */
  private _buildVesion = buildVersion;

  /**
   * Constructor
   */
  constructor(
    
  ) {} 

  /**
   * Get Api Url
   */
  getApiUrl(): string {
    return this._apiUrl;
  }

  /**
   * Get build version
   */
  getBuildVersion(): string {
    return this._buildVesion;
  }




}