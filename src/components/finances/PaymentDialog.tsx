
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface PaymentData {
  studentName: string;
  amount: number;
  paymentType: string;
  paymentMethod: string;
  notes?: string;
}

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: PaymentData) => void;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  onSave
}) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PaymentData>({
    defaultValues: {
      studentName: '',
      amount: 0,
      paymentType: '',
      paymentMethod: '',
      notes: ''
    }
  });

  const onSubmit = (data: PaymentData) => {
    onSave(data);
    toast({
      title: "Payment Recorded",
      description: `Payment of ${new Intl.NumberFormat('en-UG', {
        style: 'currency',
        currency: 'UGX',
        minimumFractionDigits: 0,
      }).format(data.amount)} has been recorded successfully.`,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Record New Payment</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="py-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="studentName" className="text-sm font-medium">Student Name</Label>
                <Input
                  id="studentName"
                  {...register('studentName', { required: 'Student name is required' })}
                  placeholder="Enter student name"
                  className="h-9"
                />
                {errors.studentName && <p className="text-sm text-red-600">{errors.studentName.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="amount" className="text-sm font-medium">Amount (UGX)</Label>
                <Input
                  id="amount"
                  type="number"
                  {...register('amount', { 
                    required: 'Amount is required',
                    min: { value: 1, message: 'Amount must be greater than 0' }
                  })}
                  placeholder="450000"
                  className="h-9"
                />
                {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="paymentType" className="text-sm font-medium">Payment Type</Label>
                <Select onValueChange={(value) => setValue('paymentType', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="School Fees">School Fees</SelectItem>
                    <SelectItem value="Lunch Fees">Lunch Fees</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Uniform">Uniform</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="paymentMethod" className="text-sm font-medium">Payment Method</Label>
                <Select onValueChange={(value) => setValue('paymentMethod', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Additional notes..."
                rows={2}
                className="resize-none"
              />
            </div>
          </form>
        </ScrollArea>

        <div className="flex justify-end space-x-2 px-6 py-4 border-t bg-gray-50">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="payment-form" onClick={handleSubmit(onSubmit)}>
            Record Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
