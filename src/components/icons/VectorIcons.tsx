import { View, StyleSheet } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
}

/**
 * Clean Mail / Envelope Icon
 */
export const MailIcon: React.FC<IconProps> = ({ size = 18, color = '#64748B' }) => {
  const width = size * 1.1;
  const height = size * 0.8;
  return (
    <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width,
          height,
          borderRadius: 3,
          borderWidth: 1.5,
          borderColor: color,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Envelope flap lines */}
        <View
          style={{
            position: 'absolute',
            top: -height * 0.3,
            left: width * 0.15,
            width: width * 0.7,
            height: height * 0.7,
            borderBottomWidth: 1.5,
            borderRightWidth: 1.5,
            borderColor: color,
            transform: [{ rotate: '45deg' }],
          }}
        />
      </View>
    </View>
  );
};

/**
 * Clean Padlock Icon
 */
export const LockIcon: React.FC<IconProps> = ({ size = 18, color = '#64748B' }) => {
  const width = size * 0.9;
  const bodyHeight = size * 0.65;
  const shackleWidth = size * 0.55;
  const shackleHeight = size * 0.55;

  return (
    <View style={{ width, height: size * 1.1, alignItems: 'center', justifyContent: 'flex-end' }}>
      {/* Shackle */}
      <View
        style={{
          width: shackleWidth,
          height: shackleHeight,
          borderTopLeftRadius: shackleWidth / 2,
          borderTopRightRadius: shackleWidth / 2,
          borderWidth: 1.6,
          borderColor: color,
          borderBottomWidth: 0,
          marginBottom: -1,
        }}
      />
      {/* Body */}
      <View
        style={{
          width,
          height: bodyHeight,
          borderRadius: 3,
          borderWidth: 1.6,
          borderColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 2.2,
            height: 4,
            backgroundColor: color,
            borderRadius: 1,
          }}
        />
      </View>
    </View>
  );
};

/**
 * Eye Icon for toggling password visibility
 */
export const EyeIcon: React.FC<IconProps & { visible?: boolean }> = ({
  size = 18,
  color = '#64748B',
  visible = false,
}) => {
  const width = size * 1.15;
  const height = size * 0.75;

  return (
    <View style={{ width, height, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <View
        style={{
          width,
          height,
          borderRadius: height / 2,
          borderWidth: 1.5,
          borderColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: size * 0.38,
            height: size * 0.38,
            borderRadius: (size * 0.38) / 2,
            backgroundColor: color,
          }}
        />
      </View>
      {visible && (
        <View
          style={{
            position: 'absolute',
            width: width * 1.1,
            height: 1.6,
            backgroundColor: color,
            transform: [{ rotate: '-45deg' }],
          }}
        />
      )}
    </View>
  );
};

/**
 * Search Magnifying Glass Icon
 */
export const SearchIcon: React.FC<IconProps> = ({ size = 16, color = '#94A3B8' }) => {
  const circleSize = size * 0.75;
  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: 1.6,
          borderColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 1,
          right: 0,
          width: size * 0.4,
          height: 1.6,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
};

/**
 * Home Icon
 */
export const HomeIcon: React.FC<IconProps> = ({ size = 18, color = '#1E293B' }) => {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Roof */}
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: size * 0.48,
          borderRightWidth: size * 0.48,
          borderBottomWidth: size * 0.42,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
        }}
      />
      {/* House Body */}
      <View
        style={{
          width: size * 0.76,
          height: size * 0.5,
          borderWidth: 1.6,
          borderTopWidth: 0,
          borderColor: color,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            width: size * 0.28,
            height: size * 0.32,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            borderWidth: 1.4,
            borderBottomWidth: 0,
            borderColor: color,
          }}
        />
      </View>
    </View>
  );
};

/**
 * Export / Cargo Box Icon
 */
export const ExportIcon: React.FC<IconProps> = ({ size = 18, color = '#475569' }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: size * 0.85,
          height: size * 0.75,
          borderWidth: 1.6,
          borderColor: color,
          borderRadius: 3,
          justifyContent: 'space-between',
        }}
      >
        {/* Top flap */}
        <View
          style={{
            height: 3,
            borderBottomWidth: 1.2,
            borderBottomColor: color,
          }}
        />
        {/* Center line */}
        <View
          style={{
            alignSelf: 'center',
            width: 1.2,
            height: size * 0.35,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
};

/**
 * SSR Document / Approval Icon
 */
export const SsrIcon: React.FC<IconProps> = ({ size = 16, color = '#0284C7' }) => {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size * 0.75,
          height: size * 0.9,
          borderWidth: 1.4,
          borderColor: color,
          borderRadius: 2,
          padding: 2,
          justifyContent: 'space-around',
        }}
      >
        <View style={{ width: '80%', height: 1.4, backgroundColor: color, borderRadius: 1 }} />
        <View style={{ width: '60%', height: 1.4, backgroundColor: color, borderRadius: 1 }} />
        <View style={{ width: '70%', height: 1.4, backgroundColor: color, borderRadius: 1 }} />
      </View>
    </View>
  );
};

/**
 * Location Pin Icon
 */
export const PinIcon: React.FC<IconProps> = ({ size = 18, color = '#1E293B' }) => {
  const pinWidth = size * 0.75;
  const pinHeight = size * 0.9;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: pinWidth,
          height: pinHeight * 0.75,
          borderTopLeftRadius: pinWidth / 2,
          borderTopRightRadius: pinWidth / 2,
          borderBottomLeftRadius: pinWidth / 4,
          borderBottomRightRadius: pinWidth / 4,
          borderWidth: 1.6,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 3.5,
            height: 3.5,
            borderRadius: 2,
            backgroundColor: color,
          }}
        />
      </View>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 3,
          borderRightWidth: 3,
          borderTopWidth: 4,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: color,
          marginTop: -1,
        }}
      />
    </View>
  );
};

/**
 * Info Icon
 */
export const InfoIcon: React.FC<IconProps> = ({ size = 16, color = '#64748B' }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.4,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: 1.8, height: 2, backgroundColor: color, borderRadius: 1, marginBottom: 1 }} />
      <View style={{ width: 1.8, height: 4.5, backgroundColor: color, borderRadius: 1 }} />
    </View>
  );
};

/**
 * Chevrons
 */
export const ChevronRightIcon: React.FC<IconProps> = ({ size = 12, color = '#94A3B8' }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size * 0.5,
        height: size * 0.5,
        borderTopWidth: 1.8,
        borderRightWidth: 1.8,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 12, color = '#94A3B8' }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size * 0.5,
        height: size * 0.5,
        borderBottomWidth: 1.8,
        borderRightWidth: 1.8,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size = 12, color = '#94A3B8' }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size * 0.5,
        height: size * 0.5,
        borderTopWidth: 1.8,
        borderLeftWidth: 1.8,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

/**
 * Checkmark Icon
 */
export const CheckmarkIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 12,
  color = '#FFFFFF',
}) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.35,
        borderBottomWidth: 1.8,
        borderLeftWidth: 1.8,
        borderColor: color,
        transform: [{ rotate: '-45deg' }, { translateY: -1 }],
      }}
    />
  </View>
);

/**
 * Cargo Ship Silhouette Vector for Hero Card
 */
export const ShipIllustration: React.FC<{ width?: number; height?: number }> = ({
  width = 120,
  height = 80,
}) => {
  return (
    <View style={{ width, height, position: 'relative', opacity: 0.28 }}>
      {/* Masts / Bridge top */}
      <View
        style={{
          position: 'absolute',
          top: height * 0.08,
          right: width * 0.35,
          width: width * 0.12,
          height: height * 0.22,
          backgroundColor: '#E0F2FE',
          borderRadius: 2,
        }}
      />
      {/* Superstructure / Cabin */}
      <View
        style={{
          position: 'absolute',
          top: height * 0.26,
          right: width * 0.24,
          width: width * 0.34,
          height: height * 0.34,
          backgroundColor: '#BAE6FD',
          borderRadius: 4,
          justifyContent: 'flex-end',
          paddingBottom: 4,
        }}
      >
        {/* Porthole windows */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 4 }}>
          <View style={styles.porthole} />
          <View style={styles.porthole} />
          <View style={styles.porthole} />
          <View style={styles.porthole} />
        </View>
      </View>
      {/* Ship Main Hull */}
      <View
        style={{
          position: 'absolute',
          bottom: height * 0.14,
          left: width * 0.05,
          width: width * 0.9,
          height: height * 0.36,
          backgroundColor: '#7DD3FC',
          borderBottomLeftRadius: width * 0.2,
          borderBottomRightRadius: width * 0.15,
          borderTopRightRadius: 6,
        }}
      />
      {/* Water Wave Base */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.16,
          backgroundColor: '#38BDF8',
          opacity: 0.5,
          borderRadius: 6,
        }}
      />
    </View>
  );
};

/**
 * Clock Icon for Pending Metric
 */
export const ClockIcon: React.FC<IconProps> = ({ size = 18, color = '#2563EB' }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 1.6,
          height: size * 0.32,
          backgroundColor: color,
          borderRadius: 1,
          position: 'absolute',
          top: size * 0.18,
        }}
      />
      <View
        style={{
          width: size * 0.24,
          height: 1.6,
          backgroundColor: color,
          borderRadius: 1,
          position: 'absolute',
          top: size * 0.44,
          right: size * 0.22,
        }}
      />
    </View>
  );
};

/**
 * Check Circle Icon for Approved Metric
 */
export const CheckCircleIcon: React.FC<IconProps> = ({ size = 18, color = '#16A34A' }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.45,
          height: size * 0.25,
          borderBottomWidth: 1.8,
          borderLeftWidth: 1.8,
          borderColor: color,
          transform: [{ rotate: '-45deg' }, { translateY: -1 }],
        }}
      />
    </View>
  );
};

/**
 * Times Circle Icon for Rejected Metric
 */
export const TimesCircleIcon: React.FC<IconProps> = ({ size = 18, color = '#EF4444' }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <View
        style={{
          width: size * 0.5,
          height: 1.8,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }],
          position: 'absolute',
        }}
      />
      <View
        style={{
          width: size * 0.5,
          height: 1.8,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '-45deg' }],
          position: 'absolute',
        }}
      />
    </View>
  );
};

/**
 * Requote Refresh Icon for Requoted Metric
 */
export const RequoteIcon: React.FC<IconProps> = ({ size = 18, color = '#D97706' }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.8,
        borderTopColor: 'transparent',
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transform: [{ rotate: '-25deg' }],
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: -2,
          right: size * 0.1,
          width: 0,
          height: 0,
          borderLeftWidth: 3,
          borderRightWidth: 3,
          borderBottomWidth: 4,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
};

/**
 * Calendar Icon for Dates
 */
export const CalendarIcon: React.FC<IconProps> = ({ size = 16, color = '#64748B' }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: size * 0.9,
          height: size * 0.85,
          borderRadius: 3,
          borderWidth: 1.4,
          borderColor: color,
          overflow: 'hidden',
        }}
      >
        <View style={{ height: 3.5, backgroundColor: color }} />
        <View style={{ flex: 1, padding: 2, flexDirection: 'row', flexWrap: 'wrap', gap: 1.5 }}>
          <View style={{ width: 2, height: 2, backgroundColor: color, borderRadius: 0.5 }} />
          <View style={{ width: 2, height: 2, backgroundColor: color, borderRadius: 0.5 }} />
          <View style={{ width: 2, height: 2, backgroundColor: color, borderRadius: 0.5 }} />
          <View style={{ width: 2, height: 2, backgroundColor: color, borderRadius: 0.5 }} />
        </View>
      </View>
    </View>
  );
};

/**
 * Edit Pen Icon
 */
export const EditPenIcon: React.FC<IconProps> = ({ size = 16, color = '#D97706' }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '45deg' }],
      }}
    >
      <View
        style={{
          width: size * 0.35,
          height: size * 0.75,
          borderWidth: 1.4,
          borderColor: color,
          borderRadius: 2,
        }}
      />
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 2.5,
          borderRightWidth: 2.5,
          borderTopWidth: 3.5,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: color,
        }}
      />
    </View>
  );
};

/**
 * Close 'X' Icon
 */
export const CloseIcon: React.FC<IconProps> = ({ size = 16, color = '#FFFFFF' }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          position: 'absolute',
          width: size * 0.75,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.75,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  );
};

/**
 * Small Map Pin for Routing
 */
export const PinSmallIcon: React.FC<IconProps> = ({ size = 12, color = '#60A5FA' }) => {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size * 0.75,
          height: size * 0.75,
          borderRadius: (size * 0.75) / 2,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: size * 0.28, height: size * 0.28, borderRadius: 1.5, backgroundColor: '#FFFFFF' }} />
      </View>
    </View>
  );
};

/**
 * Filter Icon
 */
export const FilterIcon: React.FC<IconProps> = ({ size = 16, color = '#64748B' }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size * 0.85, height: 1.8, backgroundColor: color, borderRadius: 1, marginBottom: 2.5 }} />
      <View style={{ width: size * 0.55, height: 1.8, backgroundColor: color, borderRadius: 1, marginBottom: 2.5 }} />
      <View style={{ width: size * 0.25, height: 1.8, backgroundColor: color, borderRadius: 1 }} />
    </View>
  );
};

/**
 * Clipboard Check Header Icon
 */
export const ClipboardCheckIcon: React.FC<IconProps> = ({ size = 18, color = '#FFFFFF' }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      {/* Clip top */}
      <View
        style={{
          width: size * 0.35,
          height: size * 0.18,
          borderRadius: 1.5,
          borderWidth: 1.2,
          borderColor: color,
          marginBottom: -1,
          zIndex: 2,
          backgroundColor: '#15803D',
        }}
      />
      {/* Board */}
      <View
        style={{
          width: size * 0.8,
          height: size * 0.82,
          borderRadius: 2.5,
          borderWidth: 1.5,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Checkmark inside */}
        <View
          style={{
            width: size * 0.35,
            height: size * 0.2,
            borderBottomWidth: 1.5,
            borderLeftWidth: 1.5,
            borderColor: color,
            transform: [{ rotate: '-45deg' }, { translateY: -0.5 }],
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  porthole: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0369A1',
    opacity: 0.6,
  },
});

