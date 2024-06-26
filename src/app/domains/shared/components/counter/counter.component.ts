import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  @Input({required:true}) duration: number = 0;
  @Input({required:true}) message: string = '';

  counter = signal(0);
  counterRef:number | undefined;

  constructor(){
    /// No async - no debe ser asincrono
    // Before render - antes de renderisar se muestra
    //Solo corre una vez
    console.log('Constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges){
    //Before and during render - antes y durante renderisar
    //Corre varias veces
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration']
    if(duration && duration.currentValue !== duration.previousValue){
      this.doSomething();
    }
  }

  ngOnInit(){
    // after render - ya se renderiso el componente
    // Solo corre una vez
    // Aca si se permite async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration = ',this.duration);
    console.log('message = ',this.message);
    this.counterRef = window.setInterval(()=>{
      console.log('Run interval');
      this.counter.update(statePrev => statePrev+1);
    },1000)
  }

  ngAfterViewInit(){
    //after render - despues del ngOnInit
    // hijos ya fueron renderisados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy(){
    //Cuando un componente se destruye como tal
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething(){
    console.log('change DURATION');
  }

}
