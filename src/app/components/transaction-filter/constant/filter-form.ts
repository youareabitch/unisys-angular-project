import { FormControl } from "@angular/forms";

export interface FilterForm {
    filterDate?: FormControl<Date | undefined>;
    filterNo?: FormControl<string | undefined>;
}
