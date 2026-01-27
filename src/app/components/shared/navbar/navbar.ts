import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive,
    RouterLink, ThemeToggleComponent, ButtonComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

}
