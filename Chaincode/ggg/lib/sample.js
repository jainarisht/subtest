/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.example.basic.SampleTransaction} tx The sample transaction instance.
 * @transaction
 */
async function sampleTransaction(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const oldValue = tx.device.value;
  	const oldDesc = tx.device.desc

    // Update the asset with the new value.
    tx.device.value = tx.newValue;
  	tx.device.desc = tx.newDesc;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.basic.SampleDevice');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.device);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.example.basic', 'SampleEvent');
    event.device = tx.device;
  	event.time = tx.time;
    event.oldValue = oldValue;
  	event.oldDesc = oldDesc;
    event.newValue = tx.newValue;
  	event.newDesc = tx.newDesc;
    emit(event);
}
