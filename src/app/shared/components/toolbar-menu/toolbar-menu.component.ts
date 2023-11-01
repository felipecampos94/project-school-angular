import {Component, Input} from '@angular/core';
import {menuItems} from "../../models/menu";
import {MenuItem} from "../../models/menuItem";

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'
  ]
})
export class ToolbarMenuComponent {
  @Input() shadow = false;
  @Input() popText = false;
  @Input() menuName = '';
  @Input() items_menu: MenuItem[] = [];

  protected readonly menuItems = menuItems;
}
