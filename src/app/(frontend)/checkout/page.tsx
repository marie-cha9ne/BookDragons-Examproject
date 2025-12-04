import styles from './styles.module.css'
import CustomerForm from '@/components/CustomerForm/CustomerForm'

export default function CheckoutPage() {
  
  return (
    <section className={styles.resSection}>
      <h1>Reservations</h1>
      <p>
        <strong>Important:</strong> BookDragons currently are not able to ship any orders directly
        to you as a customer. Any orders placed on the site will be notified to the shop for
        reservation. Please add your contact information for further update when your order is
        ready for pickup.
      </p>
    <CustomerForm />
    </section>
  )
}
