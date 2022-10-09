import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  patient_name !: string;
  mobile !: string;
  gender !: string;
  admission_date !: Date;
  prescription !: string;
  patient_id !: string;
  buttonName !: string;
  doctor_id !: string;
  doctor_name !: string;

  allDoctors : any[] = [];

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddPatientComponent>,
    private dataApi : DataService
  ) {

      this.title = data.title;
      this.patient_id = data.patient_id;
      this.patient_name = data.patient_name;
      this.mobile = data.mobile;
      this.gender = data.gender;
      this.admission_date = data.admission_date;
      this.prescription = data.prescription;
      this.buttonName = data.buttonName;
      this.doctor_id = data.doctor_id;
      this.doctor_name = data.doctor_name;
  }

  ngOnInit(): void {
    this.getAllDoctors();
    this.form = this.fb.group({
      patient_id: [this.patient_id, []],
      patient_name : [this.patient_name, [Validators.required]],
      mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gender : [this.gender, [Validators.required]],
      doctor_id : [this.doctor_id, [Validators.required]],
      doctor_name : [this.doctor_name, []],
      admission_date : [this.admission_date, [Validators.required]],
      prescription : [this.prescription, [Validators.required]]
    })

  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe(res => {
      this.allDoctors = res.map((e : any) => {
        const data = e.payload.doc.data();
        const doctor = {
          doctor_name : data.name,
          doctor_id : e.payload.doc.id
        }
        return doctor;
      })
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  async registerPatient() {
    this.form.value.doctor_name = await this.getDoctorName(this.form.value.id);
    this.dialogRef.close(this.form.value);
  }

  getDoctorName(doctorId : string) {
    for( let i = 0; i < this.allDoctors.length; i++) {
      if(this.allDoctors[i].doctor_id == doctorId) {
        return this.allDoctors[i].doctor_name;
      }
    }
    return "";
  }

}
