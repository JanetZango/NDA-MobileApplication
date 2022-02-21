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
  sqlitestate() {
    if (!this.isOpen) {
      this.sql = new SQLite();
      this.sql.create({ name: "test1.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS CSO (id INTEGER PRIMARY KEY AUTOINCREMENT,cso_type integer,cso_sector integer,mobilization_method integer,mobilization_date date,name_of_cso text,registration_number text,total_staff integer,ward_number integer,contact_number integer,email_address text,contact_person text,physical_address text,district integer,municipality integer)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS  CSO_Member (id INTEGER PRIMARY KEY AUTOINCREMENT,nationality integer,rsa_id_number integer,passport_number integer,first_name text,last_name text,gender integer,race integer,disability integer,member_position_guid integer,contact_number integer,physical_address text,start_date date,end_date date)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS Users ( ID	INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL, ePCR_Descriptions	TEXT , CodeId	integer)", [])

        this.isOpen = true;
        console.log("Tables Created")

      }).catch((error) => {
        console.log(error);
      }); ``

    }
  }

  SaveCSO(name_of_cso, cso_type, cso_sector, municipality,
    physical_address, contact_person, ward_number, total_staf,
    registration_number, email_address, contact_number, mobilization_method,
    mobilization_date,district) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO CSO (id,cso_type,cso_sector,mobilization_method,mobilization_date,name_of_cso,registration_number ,total_staff ,ward_number ,contact_number ,email_address ,contact_person ,physical_address ,district ,municipality ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      this.db.executeSql(sql, [cso_type,cso_sector,mobilization_method,mobilization_date,name_of_cso,registration_number ,total_staf ,ward_number ,contact_number ,email_address ,contact_person ,physical_address ,district ,municipality ]).then((data) => {
        console.log(data);
        console.log("INSERTED: " + JSON.stringify(data) + sql);
        resolve("true")
      }, (reject) => {
      })
      resolve(sql)
    })
  }
  SaveCSOMember() {
    return new Promise((resolve, reject) => {
      // this.service.getRace().subscribe(_completion => {
      // console.log(_completion)
      // for (var i = 0; i < _completion.length; i++) {
      //   let obj = {
      //     ID: _completion[i].ID,
      //     Decription: _completion[i].Decription
      //   }
      // console.log(obj)
      let sql = "INSERT INTO CSO_Member (id ,nationality ,rsa_id_number ,passport_number ,first_name ,last_name ,gender ,race ,disability ,member_position_guid ,contact_number ,physical_address ,start_date ,end_date ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      // this.db.executeSql(sql, [obj.ID, obj.Decription]).then((data) => {
      //   console.log(data);
      //   console.log("INSERTED: " + JSON.stringify(data) + sql);
      //   resolve("true")
      //   // console.log("true")
      // }, (reject) => {
      // })
      // this.insertUser.push(obj)

      // }
      // resolve(this.insertUser)
      // })
    })
  }
  getOffGender() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM Gender", []).then((data) => {
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
