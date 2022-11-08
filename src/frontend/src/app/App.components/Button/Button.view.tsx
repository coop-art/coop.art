import { ReactNode } from 'react'

import { ButtonLoading, ButtonStyled } from './Button.style'

interface ButtonProps {
  appearance?: 'primary' | 'secondary' | 'tertiary'
  icon?: string
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  clickCallback?: () => void
  loading?: boolean
}

export const Button = ({
  children,
  clickCallback = () => {},
  loading,
  appearance = 'primary',
  icon = 'arrow',
  type = 'button',
}: ButtonProps) => {
  return (
    <>
      {loading ? (
        <ButtonLoading src="/images/loader.svg" />
      ) : (
        <ButtonStyled type={type} onClick={() => clickCallback()} appearance={appearance}>
          <svg>
            <use xlinkHref={`/icons/sprites.svg#${icon}`} />
          </svg>
          <div>{children}</div>
        </ButtonStyled>
      )}
    </>
  )
}
