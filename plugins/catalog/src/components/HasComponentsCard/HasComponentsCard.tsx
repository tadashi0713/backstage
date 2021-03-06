/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentEntity, RELATION_HAS_PART } from '@backstage/catalog-model';
import {
  CodeSnippet,
  InfoCard,
  Link,
  Progress,
  WarningPanel,
} from '@backstage/core';
import {
  EntityTable,
  useEntity,
  useRelatedEntities,
} from '@backstage/plugin-catalog-react';
import React from 'react';

type Props = {
  variant?: 'gridItem';
};

export const HasComponentsCard = ({ variant = 'gridItem' }: Props) => {
  const { entity } = useEntity();
  const { entities, loading, error } = useRelatedEntities(entity, {
    type: RELATION_HAS_PART,
    kind: 'Component',
  });

  if (loading) {
    return (
      <InfoCard variant={variant} title="Components">
        <Progress />
      </InfoCard>
    );
  }

  if (error || !entities) {
    return (
      <InfoCard variant={variant} title="Components">
        <WarningPanel
          severity="error"
          title="Could not load components"
          message={<CodeSnippet text={`${error}`} language="text" />}
        />
      </InfoCard>
    );
  }

  return (
    <EntityTable
      title="Components"
      variant={variant}
      emptyContent={
        <div>
          No component is part of this system.{' '}
          <Link to="https://backstage.io/docs/features/software-catalog/descriptor-format#kind-component">
            Learn how to add components.
          </Link>
        </div>
      }
      columns={EntityTable.componentEntityColumns}
      entities={entities as ComponentEntity[]}
    />
  );
};
