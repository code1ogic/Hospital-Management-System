import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  name !: string;
  mobile !: string;
  email !: string;
  gender !: string;
  department !: string;
  birthdate !: Date;
  qualification !: string;
  id !: string;
  buttonName !: string;

  departments : string[] = ['Orthopedics','Cardiology','Otorhinolaryngology','Ophthalmology','Psychiatry','Internal medicine','Radiology','Surgery','Pediatrics','Neurology','Urology','Anesthesiology','Nephrology','Neurosurgery','Gastroenterology','Pulmonology','General surgery','Intensive care medicine','Oncology','Pathology','Emergency medicine','Neonatology','Hematology','Pharmacy','Physical medicine and rehabilitation','Vascular surgery','Geriatrics','Gynaecology','Cardiac surgery','Outpatient department','Nuclear medicine','Infectious diseases','Clinical pathology','Intensive care unit','operating room','Casualty department']

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddDoctorComponent>
  ) {
      this.title = data.title;
      this.id = data.id;
      this.name = data.name;
      this.mobile = data.mobile;
      this.email = data.email;
      this.gender = data.gender;
      this.department = data.department;
      this.birthdate = data.birthdate;
      this.qualification = data.qualification;
      this.buttonName = data.buttonName;
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      name : [this.name, [Validators.required]],
      mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email : [this.email, [Validators.required, Validators.email]],
      gender : [this.gender, [Validators.required]],
      department : [this.department, [Validators.required]],
      birthdate : [this.birthdate, [Validators.required]],
      qualification : [this.qualification,[Validators.required]]
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  registerDoctor() {
    this.dialogRef.close(this.form.value);
  }

}
