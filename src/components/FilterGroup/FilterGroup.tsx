import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Chip, Group, Skeleton, Title } from '@mantine/core';

import { RootState } from '../../store';
import { addFilter, clearFilter } from '../../store/slices/filterSlice';
import { FilterGroupProps } from '../../types/filter';

import * as classes from './FilterGroup.module.css';

export default function FilterGroup({
  title,
  filterType,
  data,
  isLoading,
  multiple,
}: FilterGroupProps) {
  const selectedItems = useSelector((state: RootState) =>
    filterType === 'genres' ? state.filters.genres : state.filters.tags
  );
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <Box component="section">
        <Title order={3} mt={0} mb="xs" mr={0} ml={0} className={classes.title}>
          {title}
        </Title>
        <Group>
          {Array.from({ length: 11 }).map((_, index) => (
            <Skeleton
              key={index}
              h="1.5rem"
              w={Math.random() * 70 + 45}
              radius="xs"
            />
          ))}
        </Group>
      </Box>
    );
  }

  return (
    <Box>
      <Title order={3} mt={0} mb="xs" mr={0} ml={0} className={classes.title}>
        {title}
      </Title>

      <Group>
        {data?.map((item) => (
          <Chip
            className={classes.item}
            key={item.id}
            checked={selectedItems?.[0] === item.id.toString()}
            onChange={(checked) =>
              checked
                ? (dispatch(clearFilter(filterType)),
                  dispatch(
                    addFilter({ type: filterType, value: item.id.toString() })
                  ))
                : dispatch(clearFilter(filterType))
            }
          >
            {item.name}
          </Chip>
        ))}
      </Group>
    </Box>
  );
}
