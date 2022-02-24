import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform, AlertController } from 'ionic-angular';
/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteProvider {
  private isOpen: boolean = false
  public db: SQLiteObject;;
  sql;
  constructor(public http: HttpClient, private sqlite: SQLite,
    public database: SQLite, private platform: Platform) {
    platform.ready().then(() => {
      // this.Remoteconnection();
      this.sqlitestate();

      // loading.dismiss();
    })
  }

  public cso_type_id: number;
  public cso_sector_id: number;
  public province_id=1;
  public district_id: number;
  public municipality_id: number;
  public ward_number: number;
  public registration_number: string;
  public name_of_cso: string;
  public contact_person: string;
  public physical_address: string;
  public contact_number: string;
  public email_address: string;
  public cso_mobilisation_method_id:number;
  public collected_by=1;
  public modified_by=2;
  // public modified_date:Date;
  public created_by=2;
  // public created_date:Date;
  public total_staff:number;

 
  sqlitestate() {
    if (!this.isOpen) {
      this.sql = new SQLite();
      this.sql.create({ name: "test1.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS CSO (id INTEGER PRIMARY KEY AUTOINCREMENT,cso_type_id integer,cso_sector_id integer,province_id integer,district_id integer,municipality_id integer,registration_number text,total_staff integer,ward_number integer,contact_number integer,email_address text,contact_person text,physical_address text,name_of_cso text)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS CSO_Member (id INTEGER PRIMARY KEY AUTOINCREMENT,first_name text,last_name text,member_position_id integer,gender text,race text,passport_number integer,nationality integer,contact_number integer,id_number integer,cso_id integer,physical_address text,end_date date,start_date date)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS Capacity ( ID	INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL, capacity_building_type_id	integer , district_id	integer,municipality_id integer,partner_id integer,facilitator_name text,venue text,start_date date,end_date date,co_facilitator_name text,funding_source_id integer)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS Assessment ( ID	INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL, ePCR_Descriptions	TEXT , CodeId	integer)", [])


        this.isOpen = true;
        console.log("Tables Created")

      }).catch((error) => {
        console.log(error);
      }); ``

    }
  }

  SaveCSO(cso_type_id ,cso_sector_id ,province_id ,district_id ,municipality_id ,registration_number ,total_staff ,ward_number ,contact_number ,email_address ,contact_person ,physical_address ,name_of_cso) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO CSO (id,cso_type_id ,cso_sector_id ,province_id ,district_id ,municipality_id ,registration_number ,total_staff ,ward_number ,contact_number ,email_address ,contact_person ,physical_address ,name_of_cso ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      this.db.executeSql(sql, [cso_type_id ,cso_sector_id ,province_id ,district_id ,municipality_id ,registration_number ,total_staff ,ward_number ,contact_number ,email_address ,contact_person ,physical_address ,name_of_cso]).then((data) => {
        console.log(data);
        console.log("INSERTED: " + JSON.stringify(data) + sql);
        resolve("true")
      }, (reject) => {
      })
      resolve(sql)
    })
  }
  SaveCSOMember(first_name ,last_name ,member_position_id ,gender ,race  ,passport_number ,nationality ,contact_number ,id_number ,cso_id ,physical_address ,end_date ,start_date) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO CSO_Member(id,first_name ,last_name ,member_position_id ,gender ,race  ,passport_number ,nationality ,contact_number ,id_number ,cso_id ,physical_address ,end_date ,start_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      this.db.executeSql(sql, [first_name ,last_name ,member_position_id ,gender ,race  ,passport_number ,nationality ,contact_number ,id_number ,cso_id ,physical_address ,end_date ,start_date]).then((data) => {
        console.log(data);
        console.log("INSERTED: " + JSON.stringify(data) + sql);
        resolve("true")
        // console.log("true")
      }, (reject) => {
      })
     
    })
  }
  SaveCapacity(capacity_building_type_id	 , district_id	,municipality_id ,partner_id ,facilitator_name ,venue ,start_date ,end_date ,co_facilitator_name ,funding_source_id ) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO Capacity(capacity_building_type_id	 , district_id	,municipality_id ,partner_id ,facilitator_name ,venue ,start_date ,end_date ,co_facilitator_name ,funding_source_id) VALUES (?,?,?,?,?,?,?,?,?,?)";
      this.db.executeSql(sql, [ capacity_building_type_id	 , district_id	,municipality_id ,partner_id ,facilitator_name ,venue ,start_date ,end_date ,co_facilitator_name ,funding_source_id]).then((data) => {
        console.log(data);
        console.log("INSERTED: " + JSON.stringify(data) + sql);
        resolve("true")
        // console.log("true")
      }, (reject) => {
      })
     
    })
  }
  getCso() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM CSO", []).then((data) => {
        console.log(data)
        let regCode = [];
        for (var i = 0; i < data.rows.length; i++) {
          regCode.push({
            ID: data.rows.item(i).ID,
            Description: data.rows.item(i).Description
            // PhysicalAddress1: data.rows.item(i).PhysicalAddress1,
            // Incident_NumberOref:data.rows.item(i).Incident_NumberOref,
            // CallerContact:data.rows.item(i).CallerContact
          });
          console.log(regCode)
        }
        resolve(regCode)
      }, (error) => {
        reject(error);
      })
    })
  }
  getCso_Member() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM CSO_Member", []).then((data) => {
        console.log(data)
        let regCode = [];
        for (var i = 0; i < data.rows.length; i++) {
          regCode.push({
            ID: data.rows.item(i).ID,
            Description: data.rows.item(i).Description
            // PhysicalAddress1: data.rows.item(i).PhysicalAddress1,
            // Incident_NumberOref:data.rows.item(i).Incident_NumberOref,
            // CallerContact:data.rows.item(i).CallerContact
          });
          console.log(regCode)
        }
        resolve(regCode)
      }, (error) => {
        reject(error);
      })
    })
  }
  getCapacity() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM Capacity", []).then((data) => {
        console.log(data)
        let regCode = [];
        for (var i = 0; i < data.rows.length; i++) {
          regCode.push({
            ID: data.rows.item(i).ID,
            Description: data.rows.item(i).Description
            // PhysicalAddress1: data.rows.item(i).PhysicalAddress1,
            // Incident_NumberOref:data.rows.item(i).Incident_NumberOref,
            // CallerContact:data.rows.item(i).CallerContact
          });
          console.log(regCode)
        }
        resolve(regCode)
      }, (error) => {
        reject(error);
      })
    })
  }


}
