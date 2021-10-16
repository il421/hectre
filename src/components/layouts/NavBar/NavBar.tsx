import { FunctionComponent, useContext, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  faBars,
  faChartBar,
  faSprayCan
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Context as AuthorizationContext } from "../../../contexts/AuthorizationContext";
import { Routes } from "../../../router";
import styles from "./NavBar.module.css";

export const NavBar: FunctionComponent = () => {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const { pathname } = useLocation();
  const {
    state: { code }
  } = useContext(AuthorizationContext);

  return (
    <nav className={styles.nav}>
      <button
        className={styles.menuButton}
        onClick={evt => {
          evt.preventDefault();
          setIsExtended(prev => !prev);
        }}
      >
        <FontAwesomeIcon className={styles.buttonIcon} icon={faBars} />
      </button>

      <div className={styles.actionButtonsWrapper}>
        <Link
          className={
            isExtended ? styles.actionButtonExtended : styles.actionButton
          }
          to={Routes.chemicals}
          data-active={!!pathname.match(Routes.chemicals)}
        >
          <FontAwesomeIcon className={styles.buttonIcon} icon={faSprayCan} />
          {isExtended && (
            <div className={styles.actionButtonText}>Chemicals</div>
          )}
        </Link>

        {code && (
          <Link
            className={
              isExtended ? styles.actionButtonExtended : styles.actionButton
            }
            to={Routes.reports}
            data-active={!!pathname.match(Routes.reports)}
          >
            <FontAwesomeIcon className={styles.buttonIcon} icon={faChartBar} />
            {isExtended && (
              <div className={styles.actionButtonText}>Reports</div>
            )}
          </Link>
        )}
      </div>
    </nav>
  );
};
