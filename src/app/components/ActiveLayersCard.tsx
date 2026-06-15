import LayerPill from './LayerPill';

export type ActiveLayer = {
  id: string;
  label: string;
  onRemove: () => void;
};

type Props = {
  layers: ActiveLayer[];
};

// Fixed-height card so selecting/deselecting a layer never shifts the layers
// list below it. When pills exceed two rows the populated card scrolls.
export default function ActiveLayersCard({ layers }: Props) {
  const isEmpty = layers.length === 0;

  return (
    <div
      className={`relative h-[116px] rounded-[8px] w-full ${
        isEmpty
          ? 'border border-dashed border-[rgba(0,0,0,0.14)]'
          : 'border border-solid border-[rgba(0,0,0,0.14)]'
      }`}
    >
      {isEmpty ? (
        <div className="flex flex-col gap-[8px] items-center justify-center p-[16px] size-full text-center text-[#6a7c68]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] text-[17px] tracking-[-0.255px]">
            No layers selected
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.55] text-[15px]">
            Pick one from the list below
          </p>
        </div>
      ) : (
        <div className="overflow-y-auto p-[16px] size-full">
          <div className="content-start flex flex-wrap gap-[8px] items-start">
            {layers.map((layer) => (
              <LayerPill key={layer.id} label={layer.label} onRemove={layer.onRemove} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
