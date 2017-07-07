import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { useAnimation, transition, trigger, state, style, query, animate } from '@angular/animations';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { fade, duration } from '../shared/animations';
import { MotionService } from '../shared/motion.service';

import { FolioService } from './folio.service';

@Component({
  selector: 'app-folio-list',
  templateUrl: './folio-list.component.html',
  styleUrls: ['./folio-list.component.css'],
  animations: [
    trigger('listAnim', [
      transition(':enter', useAnimation(fade, {params: { from: 0, to: 1 }})),
      transition(':leave', useAnimation(fade, {params: { from: 1, to: 0 }})),
    ]),
    trigger('listInner', [
      state('1', style({ width: '100%' })),
      state('0', style('*')),
      transition('*=>*', useAnimation(duration)),
    ])
  ],
})
export class FolioListComponent implements OnInit {
  @ViewChild('listContainer') container: ElementRef;

  projects;
  scrollPos = 0;

  filters = ['all', 'work', 'play'];
  category = 'all';

  constructor(
    private route: ActivatedRoute,
    private motionService: MotionService,
    private folioService: FolioService,
  ) { }

  filterProjects({key = 'cat', value}) {
    if (key === 'cat') {
      this.category = value;
    }

    this.projects = this.folioService.getFilteredList({ key, value });

    this.projects.forEach((project, n) => {
      project.computed = {
        style: { transform: `translateY(${n * 280}px)`, 'transition-delay': `${n * 50}ms` },
        active: '0',
      };
    });
  }

  setActive(slug) {
    this.filterProjects({ key: 'slug', value: slug });
    const project = this.projects[0];
    project.computed.active = '1';

    // this.pageScroll = 0;
    console.log(this.container.nativeElement);

    this.scrollTo(0);
    // lerpLoop({ from: 0, to: 200 }, 200);
  }



  setCategory(category) {
    const project = this.projects[0];
    project.computed.active = '0';
    this.filterProjects({ value: category });
    // lerpLoop({ from: 200, to: 0 }, 200);
  }

  updateFilter(paramMap) {
    switch (true) {
    case (paramMap.has('project')):
      return this.setActive(paramMap.get('project'));
    case (paramMap.has('category')):
      return this.setCategory(paramMap.get('category'));
    default:
      return this.setCategory('all');
    }
  }

// inspired by https://twitter.com/johnlindquist/status/735172526083440642?lang=en
  scrollTo(to) {
    const from = this.container.nativeElement.scrollTop;
    // todo maybe set this as variable?
    const multiplier = .2;

    if (Math.abs(from - to) < 1) {
      return false;
    }

    const lerp = (start, finish) => ((1 - multiplier) * start) + (multiplier * finish);
    this.scrollPos = lerp(from, to);

    requestAnimationFrame(() => this.scrollTo(to));
  }

// http://slides.yearofmoo.com/ng4-animations-preview/demo/

  ngOnInit() {

    this.motionService.transform({
      home: 'translate(-32px, -16px)',
      framer: 'translateY(96px)',
    });

    this.filterProjects({value: 'all'});

    this.route.paramMap.subscribe(paramMap => this.updateFilter(paramMap));

  }


}
