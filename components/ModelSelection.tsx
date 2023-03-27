'use client';
import useSWR from 'swr';
import Select from 'react-select';

const fetchModels = () => fetch('/api/getModels').then((res) => res.json());

function ModelSelection() {
  const { data: models, isLoading } = useSWR('models', fetchModels);

  //useState처럼 사용하지만, 다른 컴포넌트에서도 사용할 수 있음
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        isSearchable={true}
        isLoading={isLoading}
        menuPosition="fixed"
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
