import styles from "./Card.module.css";

interface CardProps {
  Icon: React.ElementType;
  text: string;
}

/**
 * Card component
 *
 * Displays an icon and text in a styled card container.
 * Used in the benefits section to showcase features.
 *
 * @param props - CardProps containing Icon and text
 */
function Card({ Icon, text }: CardProps) {
  return (
    <article className={styles.card}>
      {Icon && <Icon className="flex-shrink-0 self-center" />}
      {text && (
        <p className="text-base font-normal text-white m-0 min-h-[54px] flex items-center md:mt-4 md:text-center">
          {text}
        </p>
      )}
    </article>
  );
}

export default Card;
