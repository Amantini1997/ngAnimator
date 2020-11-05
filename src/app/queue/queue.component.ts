import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  outputElement = null;
  queue = ["John", "Michael"];
  queueContainer = null;
  poppablePerson = null;
  frontIndex = 0;
  rearIndex = 0;
  MAX_QUEUE_LENGTH = 10;

  constructor() {
    this.rearIndex = this.queue.length;
  }

  ngOnInit(): void { 
    this.outputElement = document.querySelector(".output");
  }
  
  dequeue(): string {
    if (!this.queueContainer) this.queueContainer = document.querySelector(".queue__ctn");
    const toReturn = this.front(false);
    this.animatePopping();
    ++this.frontIndex;
    this.moduloIndex();
    this.setOutputText("dequeue", toReturn);
    return toReturn;
  }

  isEmpty(): boolean {
    const isEmpty = this.queue.length == 0;
    this.setOutputText("isEmpty", isEmpty);
    return isEmpty;
  }

  size(): number {
    const size = this.queue.length;
    const noun = size == 1 ? "person" : "people"; 
    this.setOutputText("size", size);
    return size;
  }
  
  front(print: boolean): string {
    if (this.queue.length == 0) {
      this.setOutputText("EXCEPTION", "the queue is empty");
      return;
    }
    const frontPerson = this.queue[0];
    if (print) this.setOutputText("front", frontPerson);
    return frontPerson;
  }

  enqueue(name: string): void {
    if (this.queue.length == this.MAX_QUEUE_LENGTH) {
      this.setOutputText("EXCEPTION","the queue is full");
      return
    }
    if (!name) {
      this.setOutputText("EXCEPTION","please enter a name to enqueue");
      return;
    }
    ++this.rearIndex;
    this.moduloIndex();
    this.queue.push(name);
    this.setOutputText("enqueue", name);
    (<HTMLInputElement> document.getElementById("name")).value = "";
  }

  moduloIndex() {
    this.rearIndex %= this.MAX_QUEUE_LENGTH;
    this.frontIndex %= this.MAX_QUEUE_LENGTH;
  }
  
  animatePopping(): void {
    const personImages = this.queueContainer.children;
    const poppedPerson = personImages[0];
    poppedPerson.classList.add("popped");
    this.queueContainer.classList.add("active");
    setTimeout(() => {
      this.queue.shift();
      this.queueContainer.classList.remove("active");
    }, 1000);
  }

  setOutputText(boldText: string, text: any): void {
    this.outputElement.innerHTML = `<b>${boldText}:</b>&nbsp;${text}`;
  }
}
