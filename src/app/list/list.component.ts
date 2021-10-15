import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { EmployeeModel } from './model/employee-info.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  myForm: FormGroup;
  employeeModel: EmployeeModel = new EmployeeModel();
  employeeList: any;

  constructor(private fb: FormBuilder, private api: HttpService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: [''],
      email: [''],
      job: [''],
      salary: [''],
    });

    this.getAllEmployee();
  }

  postEmployee() {
    this.employeeModel.name = this.myForm.value.name;
    this.employeeModel.email = this.myForm.value.email;
    this.employeeModel.job = this.myForm.value.job;
    this.employeeModel.salary = this.myForm.value.salary;

    this.api.postEmployee(this.employeeModel).subscribe((res) => {
      console.log(res);
      let ref = document.getElementById('cancle');
      ref?.click();
      this.myForm.reset();
      this.getAllEmployee();
    });
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeList = res;
    });
  }

  deleteUser(list: any) {
    this.api.deleteEmployee(list.id).subscribe((res) => {
      alert('User Deleted');
      this.getAllEmployee();
    });
  }

  editUser(list: any) {
    this.employeeModel.id = list.id;
    this.myForm.controls['name'].setValue(list.name);
    this.myForm.controls['email'].setValue(list.email);
    this.myForm.controls['job'].setValue(list.job);
    this.myForm.controls['salary'].setValue(list.salary);
  }
  updateTheEmployee() {
    this.employeeModel.name = this.myForm.value.name;
    this.employeeModel.email = this.myForm.value.email;
    this.employeeModel.job = this.myForm.value.job;
    this.employeeModel.salary = this.myForm.value.salary;
    this.api
      .updateEmployee(this.employeeModel, this.employeeModel.id)
      .subscribe((res) => {
        alert('User Updated');
        let ref = document.getElementById('cancle');
        ref?.click();
        this.myForm.reset();
        this.getAllEmployee();
      });
  }
}
