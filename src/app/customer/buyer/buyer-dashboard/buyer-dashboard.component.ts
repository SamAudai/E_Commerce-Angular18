import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {

  all_products: any;
  show_checkout: Boolean = false;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.getAllProduct()
  }

  getAllProduct() {
    this.customerService.allProduct().subscribe(data => {
      this.all_products = data;
      // console.log("ALl Product", this.all_products);
    }, error => {
      console.log("My error", error);
    })
  }

  buyProduct(id:any) {
    this.show_checkout = true;
    this.customerService.quickBuyProduct(id) //We pass to serice from service we can access in another component
    this.router.navigateByUrl("/checkout");
  }

  addToCart() {
    alert("This a showcase, if you need this feature comment in the comment section")
  }

}
