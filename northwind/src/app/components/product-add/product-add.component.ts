import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  Form,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }
  add() {
    if (this.productAddForm.valid) {
      let productModule = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModule).subscribe(
        (response) => {
          this.toasterService.success(response.message, 'Success');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toasterService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Dikkat'
              );
            }
          }
        }
      );
    } else {
      this.toasterService.error('Not add product!!!!', 'Dikkat');
    }
  }
}
