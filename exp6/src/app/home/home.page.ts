import { IonicModule } from '@ionic/angular';
import {Component} from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule]   // ✅ VERY IMPORTANT
})
export class HomePage {}
