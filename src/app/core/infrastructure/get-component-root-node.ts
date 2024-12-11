import { ComponentRef, EmbeddedViewRef } from '@angular/core';

export function getComponentRootNode(componentRef: ComponentRef<any>) {
  return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
}
