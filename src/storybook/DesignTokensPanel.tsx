import React from 'react'

import { designTokens } from './designTokens'

import styles from './DesignTokensPanel.module.scss'

type SwatchProps = {
  label: string
  scssVar: string
  color: string
}

const Swatch: React.FC<SwatchProps> = ({ label, scssVar, color }) => (
  <div className={styles.swatch}>
    <div className={styles.swatchColor} style={{ background: color }} />
    <div className={styles.swatchMeta}>
      <span className={styles.swatchLabel}>{label}</span>
      <code className={styles.swatchVar}>{scssVar}</code>
      <code className={styles.swatchValue}>{color}</code>
    </div>
  </div>
)

type TokenGroupProps = {
  title: string
  items: SwatchProps[]
}

const TokenGroup: React.FC<TokenGroupProps> = ({ title, items }) => (
  <section className={styles.group}>
    <h3 className={styles.groupTitle}>{title}</h3>
    <div className={styles.grid}>
      {items.map(item => (
        <Swatch key={item.scssVar} {...item} />
      ))}
    </div>
  </section>
)

export const DesignTokensPanel: React.FC = () => (
  <div className={styles.panel}>
    <header className={styles.header}>
      <h2 className={styles.title}>Design Tokens</h2>
      <p className={styles.subtitle}>
        Источник правды: <code>src/utils/scss/variables.scss</code>. JS-зеркало:{' '}
        <code>src/storybook/designTokens.ts</code>. Переключите тему в toolbar
        (light / dark) — фон canvas и пары LIGHT_/DARK_ должны совпадать с CRM.
      </p>
    </header>

    <TokenGroup
      title='Геометрия'
      items={[
        {
          label: 'Border radius',
          scssVar: '$BORDER_RADIUS',
          color: designTokens.geometry.borderRadius,
        },
        {
          label: 'Transition',
          scssVar: '$TRANSITION_TIME',
          color: designTokens.geometry.transitionTime,
        },
      ]}
    />

    <TokenGroup
      title='Бренд и семантика'
      items={[
        {
          label: 'Default',
          scssVar: '$DEFAULT_COLOR',
          color: designTokens.brand.defaultColor,
        },
        {
          label: 'Default (opacity)',
          scssVar: '$DEFAULT_COLOR_WITH_OPACITY',
          color: designTokens.brand.defaultColorWithOpacity,
        },
        {
          label: 'Success',
          scssVar: '$SUCCESS_COLOR',
          color: designTokens.semantic.success,
        },
        {
          label: 'Warning',
          scssVar: '$WARNING_COLOR',
          color: designTokens.semantic.warning,
        },
        {
          label: 'Danger',
          scssVar: '$DANGER_COLOR',
          color: designTokens.semantic.danger,
        },
      ]}
    />

    <TokenGroup
      title='Light theme'
      items={[
        { label: 'BG', scssVar: '$LIGHT_BG', color: designTokens.light.bg },
        {
          label: 'Element BG',
          scssVar: '$LIGHT_ELEMENT_BG',
          color: designTokens.light.elementBg,
        },
        {
          label: 'Text',
          scssVar: '$LIGHT_COLOR',
          color: designTokens.light.color,
        },
        {
          label: 'Hover BG',
          scssVar: '$LIGHT_HOVER_BG',
          color: designTokens.light.hoverBg,
        },
      ]}
    />

    <TokenGroup
      title='Dark theme'
      items={[
        { label: 'BG', scssVar: '$DARK_BG', color: designTokens.dark.bg },
        {
          label: 'Element BG',
          scssVar: '$DARK_ELEMENT_BG',
          color: designTokens.dark.elementBg,
        },
        {
          label: 'Text',
          scssVar: '$DARK_COLOR',
          color: designTokens.dark.color,
        },
        {
          label: 'Hover BG',
          scssVar: '$DARK_HOVER_BG',
          color: designTokens.dark.hoverBg,
        },
      ]}
    />

    <section className={styles.group}>
      <h3 className={styles.groupTitle}>Примеры border-radius</h3>
      <div className={styles.radiusRow}>
        <div className={styles.radiusSample}>$BORDER_RADIUS</div>
        <div className={styles.radiusSamplePill}>pill (50px)</div>
      </div>
    </section>

    <section className={styles.group}>
      <h3 className={styles.groupTitle}>Градиент активного элемента</h3>
      <div className={styles.gradientBar} />
      <code className={styles.gradientCode}>
        $ACTIVE_ELEMENT_BG_GRADIENT — {designTokens.brand.gradient.deg},{' '}
        {designTokens.brand.gradient.color1} → {designTokens.brand.gradient.color2}
      </code>
    </section>
  </div>
)
