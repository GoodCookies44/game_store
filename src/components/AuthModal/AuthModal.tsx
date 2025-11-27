import React, { useState } from 'react';

import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Tabs,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLogin, IconUserPlus } from '@tabler/icons-react';

import { AuthFormValues, AuthModalProps } from '../../types/auth';

import * as classes from './AuthModal.module.css';

export default function AuthModal({
  opened,
  onClose,
  activeTab,
  onTabChange,
}: AuthModalProps) {
  const form = useForm<AuthFormValues>({
    initialValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters' : null,
      confirmPassword: (value, values) =>
        activeTab === 'register' && value !== values.password
          ? 'Passwords do not match'
          : null,
    },
  });

  const handleSubmit = (values: AuthFormValues) => {
    activeTab === 'login'
      ? console.log('Login: ', values)
      : console.log('Register: ', values);

    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Authentication"
      classNames={{
        header: classes.madalSectiom,
        title: classes.modalTitle,
        body: classes.modalBody,
      }}
      centered
    >
      <Tabs value={activeTab} onChange={onTabChange}>
        <Tabs.List className={classes.list}>
          <Tabs.Tab value="login" leftSection={<IconLogin size={16} />}>
            Sign in
          </Tabs.Tab>
          <Tabs.Tab value="register" leftSection={<IconUserPlus size={16} />}>
            Register
          </Tabs.Tab>
        </Tabs.List>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Tabs.Panel value="login">
            <Group className={classes.inputsContainer}>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                {...form.getInputProps('password')}
              />
            </Group>

            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </Tabs.Panel>

          <Tabs.Panel value="register">
            <Group className={classes.inputsContainer}>
              <TextInput
                label="Username"
                placeholder="Your username"
                required
                {...form.getInputProps('username')}
              />
              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label="Confirm password"
                placeholder="Confirm your password"
                required
                {...form.getInputProps('confirmPassword')}
              />
            </Group>

            <Button type="submit" fullWidth>
              Create account
            </Button>
          </Tabs.Panel>
        </form>
      </Tabs>
    </Modal>
  );
}
