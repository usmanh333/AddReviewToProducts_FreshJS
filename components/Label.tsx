export default function Label({name}:any) {
    return (
      <label className="block text-gray-400 font-medium mb-1">
        {name}
      </label>
    );
  }