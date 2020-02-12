import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import * as $ from 'jquery';
import anime from '../../../../assets/anime.min.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _userService: UserService) {
  }


  ngOnInit() {
    $('.ml12').each(function () {
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, '<span class=\'letter\'>$&</span>'));
    });

    anime.timeline({loop: false}).add({
      targets: '.ml12 .letter',
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: function (el, i) {
        return 2000 + 30 * i;
      }
    });
      /*.add({
      targets: '.ml12 .letter',
      translateX: [0, -30],
      opacity: [1, 0],
      easing: 'easeInExpo',
      duration: 1200,
      delay: function (el, i) {
        return 100 + 30 * i;
      }
    });*/
  }

}
