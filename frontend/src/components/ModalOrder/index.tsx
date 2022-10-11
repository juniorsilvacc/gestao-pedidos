import React from 'react';

// Modal
import Modal from 'react-modal';

// Icons
import { FiX } from 'react-icons/fi';

// Styles
import styles from './styles.module.css';

// Interface
import { OrderItemProps } from '../../pages/Dasboard';

// API
import api from '../../services/api';

interface IModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleConcludeOrder: (id: string) => void;
}

export default function ModalOrder({ isOpen, onRequestClose, order, handleConcludeOrder }: IModalOrderProps) {
  const customStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ffd2d2'
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyle}
    >
      <div className={styles.buttonAndDescription}>
        <h1>Detalhes do pedido</h1>

        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <FiX size={28} color="#f34748" />
        </button>
      </div>

      <div className={styles.container}>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

          {order.map((item) => (
            <section key={item.id} className={styles.containerItem}>
              <span>{item.amount} - <strong>{item.product.name}</strong> R$ {item.product.price},00</span>
            </section>
          ))}

          <div className={styles.buttonAndStatus}>
            <button className={styles.concludeOrder} onClick={() => handleConcludeOrder(order[0].order_id)}>
              Finalizar Pedido
            </button>

            <span className={styles.statusOrder}>Status: {order[0].order.status === true ? 'Concluído' : 'Em Andamento'}</span>
          </div>
      </div>
    </Modal>
  )
}
