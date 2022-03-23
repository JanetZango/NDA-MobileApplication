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
  public db: SQLiteObject;
  sql;
  inserOptions=[];
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
      this.sql.create({ name: "test11.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS CSO (id INTEGER PRIMARY KEY AUTOINCREMENT,cso_type_id integer,cso_sector_id integer,province_id integer,district_id integer,municipality_id integer,registration_number text,total_staff integer,ward_number integer,contact_number integer,email_address text,contact_person text,physical_address text,name_of_cso text,mobilization_method integer,mobilization_date date,collected_by integer)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS CSO_Member (id INTEGER PRIMARY KEY AUTOINCREMENT,first_name text,last_name text,member_position_id integer,gender text,race text,passport_number integer,nationality integer,contact_number integer,id_number integer,cso_id integer,physical_address text,end_date date,start_date date,disability text)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS Capacity ( id	INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL, capacity_building_type_id	integer , district_id	integer,municipality_id integer,partner_id integer,facilitator_name text,venue text,start_date date,end_date date,co_facilitator_name text,funding_source_id integer,province_id integer)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS Assessment ( id	INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,cso_id integer, assessment_type_id integer,calc_assessment_level integer, assessment_date date)", [])


        this.isOpen = true;
        console.log("Tables Created")

      }).catch((error) => {
        console.log(error);
      }); ``

    }
  }

  SaveCapacity(capacity_building_type_id	 , district_id	,municipality_id ,partner_id ,facilitator_name ,venue ,start_date ,end_date ,co_facilitator_name ,funding_source_id ) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO Capacity(id,capacity_building_type_id	,district_id,municipality_id ,partner_id ,facilitator_name ,venue ,start_date ,end_date ,co_facilitator_name ,funding_source_id) VALUES (?,?,?,?,?,?,?,?,?,?)";
      this.db.executeSql(sql, [ capacity_building_type_id	 , district_id	,municipality_id ,partner_id ,facilitator_name ,venue ,start_date ,end_date ,co_facilitator_name ,funding_source_id]).then((data) => {
        console.log(data);
        console.log("INSERTED: " + JSON.stringify(data) + sql);
        resolve("true")
        // console.log("true")
      }, (reject) => {
      })
     
    })
  }
  getAssessment() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM Assessment", []).then((data) => {
        console.log(data)
        let regCode = [];
        for (var i = 0; i < data.rows.length; i++) {
          regCode.push({
            ID: data.rows.item(i).ID,
            cso_id: data.rows.item(i).cso_id,
            calc_assessment_level: data.rows.item(i).calc_assessment_level,
            assessment_type_id:data.rows.item(i).assessment_type_id,
            assessment_date:data.rows.item(i).assessment_date
          });
          console.log(regCode)
        }
        resolve(regCode)
      }, (error) => {
        reject(error);
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
            id: data.rows.item(i).id,
            cso_type_id: data.rows.item(i).cso_type_id,
            cso_sector_id: data.rows.item(i).cso_sector_id,
            name_of_cso:data.rows.item(i).name_of_cso,
            municipality_id:data.rows.item(i).municipality_id,
            province_id:data.rows.item(i).province_id,
            district_id:data.rows.item(i).district_id,
            registration_number:data.rows.item(i).registration_number,
            total_staff:data.rows.item(i).total_staff,
            ward_number:data.rows.item(i).ward_number,
            contact_number:data.rows.item(i).contact_number,
            email_address:data.rows.item(i).email_address,
            contact_person:data.rows.item(i).contact_person,
            physical_address:data.rows.item(i).physical_address,
            mobilization_date:data.rows.item(i).mobilization_date,
            collected_by:data.rows.item(i).collected_by,
         
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
            first_name: data.rows.item(i).first_name,
            last_name: data.rows.item(i).last_name,
            member_position_id:data.rows.item(i).member_position_id,
            gender:data.rows.item(i).gender,
            race:data.rows.item(i).race,
            passport_number:data.rows.item(i).passport_number,
            nationality:data.rows.item(i).nationality,
            contact_number:data.rows.item(i).contact_number,
            cso_id:data.rows.item(i).cso_id,
            physical_address:data.rows.item(i).physical_address,
            end_date:data.rows.item(i).end_date,
            start_date:data.rows.item(i).start_date,
            id_number:data.rows.item(i).id_number,
            disability:data.rows.item(i).disability
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
            capacity_building_type_id: data.rows.item(i).capacity_building_type_id,
            district_id: data.rows.item(i).district_id,
            municipality_id: data.rows.item(i).municipality_id,
            partner_id:data.rows.item(i).partner_id,
            facilitator_name:data.rows.item(i).facilitator_name,
            venue:data.rows.item(i).venue,
            start_date:data.rows.item(i).start_date,
            end_date:data.rows.item(i).end_date,
            co_facilitator_name:data.rows.item(i).co_facilitator_name,
            funding_source_id:data.rows.item(i).funding_source_id,
            province_id:data.rows.item(i).province_id
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
