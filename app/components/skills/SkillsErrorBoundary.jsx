'use client';
import { Component } from 'react';

// Catches any error from the WebGL canvas / texture loading and renders a
// graceful static fallback instead of leaving the section blank or crashing.
export default class SkillsErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (typeof console !== 'undefined') {
      console.warn('Skills 3D scene failed — showing static fallback.', error);
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
