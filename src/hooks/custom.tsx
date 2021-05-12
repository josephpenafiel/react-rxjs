import { useEffect } from "react";
import { Observable } from "rxjs";
export const useObservable = (
  observable: Observable<any>,
  setter: (arg: any) => any
) => {
  useEffect(() => {
    console.log("using effect");
    const subs = observable.subscribe(setter);
    return () => subs.unsubscribe();
  }, [observable, setter]);
};
