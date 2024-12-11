import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { getComponentRootNode } from '../infrastructure/get-component-root-node';
import { LoaderComponent } from 'src/app/shared/compenents/loader/loader.component';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _loading: boolean=false;
  private _changes = new Subject<void>();
  private el: HTMLElement;
  private counter = 0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    this.el = document.createElement('div');
    this.el.classList.add('loading-overlay');

    const portalHost = new DomPortalOutlet(this.el, this.componentFactoryResolver, this.appRef, this.injector);
    const portal = new ComponentPortal(LoaderComponent);
    const componentRef: ComponentRef<LoaderComponent> = portalHost.attachComponentPortal(portal);

    const rootNode = getComponentRootNode(componentRef);
    rootNode.classList.add('md');

    document.body.appendChild(this.el);
  }

  /**
   * Emits when the loading state changes.
   */
  get changes(): Observable<void> {
    return this._changes.asObservable();
  }

  /**
   * Gets whether the loading state is active.
   */
  get isLoading(): boolean {
    return this._loading;
  }

  /**
   * Activate the loading state.
   */
  start() {
    this.counter++;

    this.unfocusActiveElement();
    this._loading = true;
    this.handleUpdate();
  }

  /**
   * Deactivate the loading state.
   */
  stop() {
    if (this.counter <= 0) {
      console.debug('Counter reached negative state or was already zero. Resetting to zero.');
      this.counter = 0;
      return;
    }

    this.counter--;

    if (this.counter === 0) {
      this._loading = false;
      this.handleUpdate();
    }
  }

  private handleUpdate() {
    this._changes.next();
    this.el.classList.toggle('active', this._loading);
  }

  private unfocusActiveElement() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
