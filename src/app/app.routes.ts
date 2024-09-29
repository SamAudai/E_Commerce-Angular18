import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { AdminAuthGaurdService, BuyerAuthGaurdService, SellerAuthGaurdService, SellerBuyerAuthGuardLogin } from './shared/services/auth-gaurd.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { SellerDashboardComponent } from './customer/seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { ProductCrudComponent } from './product/product-crud/product-crud.component';

export const routes: Routes =
  [
    { path: "", component: HomeComponent },
    { path: "contact-us", component: ContactUsComponent },
    { path: "my-profile", component: UserProfileComponent },

    //Path/component you want to access before customer(seller and buyer) login/signin
    {
      path: '', canActivate: [SellerBuyerAuthGuardLogin], children: [
        { path: "sign-in", component: SigninSignupComponent },
        { path: "sign-up", component: SigninSignupComponent },
      ]
    },

    //Path/component you want to access after admin login/signin
    {
      path: '', canActivate: [AdminAuthGaurdService], children: [
        { path: "admin-dashboard", component: AdminDashboardComponent },
        { path: "admin/user", component: UserCrudComponent },
        { path: "admin/product", component: ProductCrudComponent }
      ]
    },

    //Path/component you want to access before customer(seller and buyer) login/signin
    {
      path: '', canActivate: [SellerBuyerAuthGuardLogin], children: [
        { path: "sign-in", component: SigninSignupComponent },
        { path: "sign-up", component: SigninSignupComponent },
      ]
    },

    //Path/component you want to access after customer(seller) login/signin
    {
      path: '', canActivate: [SellerAuthGaurdService], children: [
        { path: "seller-dashboard", component: SellerDashboardComponent },
        { path: "seller/product", component: ProductCrudComponent },
      ]
    },

    //Path/component you want to access after customer(buyer) login/signin
    {
      path: '', canActivate: [BuyerAuthGaurdService], children: [
        { path: "buyer-dashboard", component: BuyerDashboardComponent },
        { path: "checkout", component: CheckoutComponent }
      ]
    },
    
    { path: "", redirectTo: "/", pathMatch: "full" },
    //{ path: "**", component: PageNotFoundErrorComponent }
  ];
