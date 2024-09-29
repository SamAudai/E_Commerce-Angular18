import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit {

  order_dashboard_data:any;
  total_order:any;
  last_order_date:any;

  product_dashboard_data:any;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;

  constructor(private router: Router, private customerService: CustomerService){}

  ngOnInit(): void {
    this.sellerOrderDashboardData();
    this.sellerProductDashboardData();
  }

  sellerProductDashboard() {
    this.router.navigateByUrl("/seller/product");
  }
  sellerOrderDashboard() {
    alert("WIP")
  }

  sellerOrderDashboardData() {
    this.customerService.orderDashboardData().subscribe(data => {
      this.order_dashboard_data = data;
      this.total_order = Number(this.order_dashboard_data.length);
      this.last_order_date = this.order_dashboard_data[this.total_order - 1].dateTime;
      // console.log("product_dashboard_data", this.order_dashboard_data);
    }, error => {
      console.log("My error", error);
    })
  }

  sellerProductDashboardData() {
    this.customerService.productDashboardData().subscribe(data => {
      this.product_dashboard_data = data;
      for (status in this.product_dashboard_data) {
        // console.log(this.product_dashboard_data[status].status);
        if (this.product_dashboard_data[status].status == 'publish') {
          ++this.publish_product;
        } else if (this.product_dashboard_data[status].status == 'inactive') {
          ++this.inactive_product;
        } else if (this.product_dashboard_data[status].status == 'draft') {
          ++this.draft_product;
        }
        ++this.total_product;
      }
      // console.log(this.publish_product);

      // console.log("product_dashboard_data", this.product_dashboard_data[this.product_dashboard_data.length - 1]);
    }, error => {
      console.log("My error", error);
    })
  }

}
