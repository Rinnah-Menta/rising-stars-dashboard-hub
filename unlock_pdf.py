import tkinter as tk
from tkinter import filedialog, messagebox
import pikepdf
import os

def unlock_pdf():
    try:
        input_path = filedialog.askopenfilename(
            title="Select Locked PDF",
            filetypes=[("PDF files", "*.pdf")]
        )

        if not input_path:
            return  # User cancelled

        output_folder = filedialog.askdirectory(title="Select Output Folder")
        if not output_folder:
            return  # User cancelled

        filename = os.path.basename(input_path)
        output_path = os.path.join(output_folder, filename)

        pdf = pikepdf.open(input_path)
        pdf.save(output_path)
        pdf.close()

        messagebox.showinfo("Success", f"✅ Unlocked PDF saved as:\n{output_path}")

    except pikepdf._qpdf.PasswordError:
        messagebox.showerror("Error", "🔒 PDF is password-protected. Cannot unlock without password.")
    except Exception as e:
        messagebox.showerror("Error", f"❌ Something went wrong:\n{e}")

# Create the UI
window = tk.Tk()
window.title("PDF Unlocker")
window.geometry("300x150")
window.resizable(False, False)

label = tk.Label(window, text="Unlock a PDF file", font=("Arial", 14))
label.pack(pady=10)

btn = tk.Button(window, text="Select PDF and Unlock", command=unlock_pdf)
btn.pack(pady=10)

window.mainloop()
