import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function TermsAndConditions({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#05141A" barStyle="light-content" />
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconWrapper}>
            <Image source={require('../assets/aarow.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.topBarTitle}>Terms & Conditions</Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>LEGAL TERMS & CONDITIONS</Text>
          <Text style={styles.termsBody}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.{"\n\n"}

            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.{"\n\n"}

            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
            sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </Text>
        </ScrollView>

        {/* Bottom Agree Button */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.agreeButton}
           onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Text style={styles.agreeButtonText}>I Agree</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#05141A',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    backgroundColor: '#05141A',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconWrapper: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 2,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.5,
    color: '#717171',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  termsBody: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.2,
    color: '#8F8F8F',
    textAlign: 'left',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  agreeButton: {
    backgroundColor: '#009CA0',
    borderRadius: 8,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agreeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.5,
    color: '#fff',
  },
});
