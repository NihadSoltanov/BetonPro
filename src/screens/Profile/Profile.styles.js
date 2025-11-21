    import {StyleSheet} from 'react-native';
    import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../styles/theme';

    const styles = StyleSheet.create({
      loaderContainer: {
        justifyContent: 'center',
        display: 'flex',
        flex: 1,
        minHeight: 150,
      },
      titleText: {
        color: COLORS.primary,
        fontFamily: FONTS.bold,
        fontSize: FONT_SIZE.heading.md,
        marginTop: SPACING.md,
        marginBottom: SPACING.xs,
      },
      submitContainer: {
        position: 'absolute',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        bottom: SPACING.lg,
        marginHorizontal: SPACING.md,
      },
      subText: {
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZE.text.sm,
        color: COLORS.darkGrey,
      },
    });

    export default styles;
