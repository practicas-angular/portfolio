import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title class="text-primary">Nuevo Usuario</h2>
    <mat-dialog-content>
      <p class="text-muted" style="margin-bottom: 16px;">
        Elige tu nombre de usuario para el chat interactivo:
      </p>

      <!-- Material Input Field -->
      <mat-form-field
        appearance="outline"
        style="width: 100%; margin-top: 8px;"
      >
        <mat-label>Nombre de usuario</mat-label>
        <input
          matInput
          [(ngModel)]="username"
          cdkFocusInitial
          (keyup.enter)="submit()"
        />
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancelar</button>
      <button
        mat-raised-button
        color="accent"
        (click)="submit()"
        [disabled]="!username.trim()"
      >
        Entrar
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      /* Ensure the title uses your custom font and color */
      h2 {
        font-family: var(--font-secondary);
        color: var(--color-primary);
        margin: 0;
      }
    `,
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
