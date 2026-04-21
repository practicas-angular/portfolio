import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-signup-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss'
  ],
})
export class SignupDialogComponent {
  dialogRef = inject(MatDialogRef<SignupDialogComponent>);

  // Default value, just like your old prompt [2]
  username = 'Reclutador_Tech';

  cancel() {
    this.dialogRef.close(); // Closes without returning data
  }

  submit() {
    if (this.username.trim()) {
      this.dialogRef.close(this.username.trim()); // Returns the username
    }
  }
}
