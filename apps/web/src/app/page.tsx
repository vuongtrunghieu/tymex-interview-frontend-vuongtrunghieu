import { Button } from '@fpoon-tymex/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@fpoon-tymex/ui/select';
import { Slider } from '@fpoon-tymex/ui/slider';

export default function Root() {
  return (
    <div>
      <h1>HELLO</h1>
      <div className="space-y-2">
        <Button variant="default">Click me TEST!</Button>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className="max-w-[200px]"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
