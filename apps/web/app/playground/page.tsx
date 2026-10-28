import Playground from './ui/playground'
import * as storageActions from '@/actions/storage'

export default function PlaygroundPage() {
  const actions = Object.keys(storageActions).filter((name) => typeof storageActions[name as keyof typeof storageActions] === 'function')

  return <Playground actions={actions} />
}
